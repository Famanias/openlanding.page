import * as THREE from "three";
import { clamp, damp } from "../motion/math";
import { formatClock } from "../night/clock";
import { CYCLE_MIN, type NightPlan } from "../night/your-night";
import { chapterX } from "./shore";
import type { Part, WorldCtx } from "./types";
import { createWorldText, type WorldText } from "./worldText";

const UNITS_PER_MIN = 16 / CYCLE_MIN; // one sleep cycle = 16 world units of shoreline
const Y = 12;
const Z = -10;
const AMP = 1.7;

/** "Your night": the visitor's own tide line hung over the dawn water, one dip per cycle, smart wake marked. */
export function createFinaleStrip(ctx: WorldCtx) {
  const group = new THREE.Group();
  group.position.set(chapterX("dawn"), Y, Z);
  ctx.scene.add(group);

  const lineMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.56, 0.83, 1).multiplyScalar(1.4), transparent: true, toneMapped: false });
  const tickMat = new THREE.MeshBasicMaterial({ color: 0xecefF0, transparent: true, opacity: 0.5 });
  const markerMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.92, 0.85, 0.65).multiplyScalar(2.2), transparent: true, toneMapped: false });
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 16), markerMat);
  const halo = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.8, 48), markerMat);
  marker.add(halo);
  group.add(marker);

  let line: THREE.Mesh | null = null;
  let ticks: THREE.Mesh[] = [];
  let labels: WorldText[] = [];
  let length = 0;
  let panTarget = 0;
  let pan = 0;
  let presence = 0;

  const level = (min: number) => Math.cos((min / CYCLE_MIN) * Math.PI * 2) * AMP;

  function clear() {
    if (line) {
      group.remove(line);
      line.geometry.dispose();
      line = null;
    }
    ticks.forEach((t) => {
      group.remove(t);
      t.geometry.dispose();
    });
    labels.forEach((l) => {
      group.remove(l.mesh);
      l.dispose();
    });
    ticks = [];
    labels = [];
  }

  function label(text: string, x: number, y: number, size: number, color: THREE.ColorRepresentation, anchorY: "top" | "bottom") {
    const l = createWorldText(ctx, { text, font: ctx.fonts.mono, fontSize: size, mode: "always", color, anchorY, tear: 0.3 });
    l.mesh.position.set(x, y, 0);
    group.add(l.mesh);
    labels.push(l);
  }

  return {
    setPlan(plan: NightPlan | null) {
      clear();
      if (!plan) {
        length = 0;
        return;
      }
      length = plan.durationMin * UNITS_PER_MIN;
      const x0 = -length / 2;
      const pts: THREE.Vector3[] = [];
      const steps = Math.max(48, Math.round(plan.durationMin / 3));
      for (let i = 0; i <= steps; i++) {
        const m = (i / steps) * plan.durationMin;
        pts.push(new THREE.Vector3(x0 + m * UNITS_PER_MIN, level(m), 0));
      }
      line = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), steps * 2, 0.09, 8, false), lineMat);
      group.add(line);
      for (const b of plan.cycleBoundariesMin) {
        const t = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.9, 0.05), tickMat);
        t.position.set(x0 + b * UNITS_PER_MIN, level(b) - AMP * 0.2 - 0.9, 0);
        group.add(t);
        ticks.push(t);
      }
      marker.position.set(x0 + plan.smartWakeMin * UNITS_PER_MIN, level(plan.smartWakeMin), 0.1);
      label(formatClock(plan.bedMin), x0, -AMP - 1.1, 0.9, 0xecefF0, "top");
      label(formatClock(plan.wakeMin), x0 + length, -AMP - 1.1, 0.9, 0xecefF0, "top");
      label(`${formatClock(plan.bedMin + plan.smartWakeMin)}  we wake you here`, marker.position.x, marker.position.y + 1.2, 0.75, 0xebd9a6, "bottom");
      // open on the smart-wake moment, the part of the night that matters most
      panTarget = clamp(-marker.position.x * 0.75, -length / 2, length / 2);
    },
    /** Drag in screen pixels → walk the strip. */
    pan(dxPx: number) {
      panTarget = clamp(panTarget + dxPx * 0.06, -length / 2, length / 2);
    },
    part: {
      update(f, w) {
        presence = damp(presence, w.dawn > 0.5 && length > 0 ? 1 : 0, 3, f.dt);
        pan = damp(pan, panTarget, 6, f.dt);
        group.position.x = chapterX("dawn") + pan;
        group.visible = presence > 0.01;
        lineMat.opacity = presence;
        tickMat.opacity = presence * 0.5;
        markerMat.opacity = presence;
        halo.scale.setScalar(1 + 0.25 * Math.sin(f.time * 2.4));
        halo.lookAt(ctx.camera.position);
        labels.forEach((l) => (l.uWeight.value = presence));
      },
      dispose() {
        clear();
        lineMat.dispose();
        tickMat.dispose();
        markerMat.dispose();
        marker.geometry.dispose();
        halo.geometry.dispose();
      },
    } satisfies Part,
  };
}

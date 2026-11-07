import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as THREE from "three";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Contribute } from "./Contribute";
import { Footer } from "./Footer";
import { pointInFooterScene, stepFooterPointer, createFooterPointerState } from "./FooterScene";
import { createFooterSculpture } from "./footer/sculpture";
import { createHeroPaintSimulation } from "./hero/paintSpread";

describe("landing page sections", () => {
  it("Header renders lowercase openlandingpage wordmark and nav links", () => {
    const html = renderToStaticMarkup(<Header />);
    expect(html).toContain("openlandingpage");
    expect(html).toContain('href="#gallery"');
    expect(html).toContain('href="#contact"');
    expect(html).toContain("GitHub");
    expect(html).toContain('href="https://github.com/Famanias/openlanding.page"');
  });

  it("Hero renders centered title, subtitle with MIT License, and GitHub star CTA", () => {
    const html = renderToStaticMarkup(<Hero />);
    expect(html).toContain("Landing Pages, from Header to Footer.");
    expect(html).toContain("Not Just A Hero Section. One Click Download, 100% Free, No Paywalls.");
    expect(html).toContain("MIT License");
    expect(html).toContain("Give a star on GitHub");
    expect(html).toContain('href="#contact"');
    expect(html).toContain("Request a template");
    expect(html).toContain('href="https://github.com/Famanias/openlanding.page"');
    expect(html).not.toContain("Issue #01");
    expect(html).not.toContain("3 Bespoke Drops");
    expect(html).toContain("items-center");
    expect(html).toContain("text-center");
  });

  it("renders the template request offer and email form", () => {
    const html = renderToStaticMarkup(<Contribute />);
    expect(html).toContain("Your site, templated.");
    expect(html).toContain("official OpenLanding.page gallery template, open source under the MIT license");
    expect(html).toContain("Paid private commission");
    expect(html).toContain("You own the code, and your design stays out of the gallery.");
    expect(html).toContain('name="project_type"');
    expect(html).toContain('action="https://formsubmit.co/famianas.dev@gmail.com"');
    expect(html).toContain('name="email"');
    expect(html).toContain('href="mailto:famianas.dev@gmail.com"');
    expect(html).toContain("Send request");
  });

  it("Footer renders minimal copyright notice with MIT license and craft attribution", () => {
    const html = renderToStaticMarkup(<Footer />);
    expect(html).toContain('id="contact"');
    expect(html).toContain("Your site, templated.");
    expect(html).toContain("OpenLanding.page. MIT Licensed.");
    expect(html).not.toContain("Award-grade web designs");
    expect(html).not.toContain('href="#gallery"');
    expect(html).not.toContain('href="#how-it-works"');
    expect(html).not.toContain("<span>openlandingpage</span>");
    expect(html).toContain("/community-terms");
    expect(html).toContain("/community-privacy");
    expect(html).toContain("External community websites keep their own terms.");

    const licenseBytes = readFileSync(path.resolve(process.cwd(), "LICENSE"));
    const licenseSha256 = createHash("sha256").update(licenseBytes).digest("hex");
    expect(licenseSha256).toBe("a9fb8dc126580c276ee676b93d63d7009b174f11be054afc778d4b6957e26853");
  });

  it("maps pointer coordinates inside the footer scene into sculpture local space", () => {
    const rect = { left: 100, right: 1000, top: 200, bottom: 500, width: 900, height: 300 };
    const camera = { left: -9, right: 9, top: 3, bottom: -3 };
    const scale = { x: 1, y: 1 };

    const center = pointInFooterScene(550, 350, rect, camera, scale);
    expect(center).toEqual({ x: 0, y: 0 });

    const topLeft = pointInFooterScene(100, 200, rect, camera, scale);
    expect(topLeft).toEqual({ x: -9, y: 3 });

    const scaled = pointInFooterScene(1000, 500, rect, { left: -13.5, right: 13.5, top: 3, bottom: -3 }, { x: 1.5, y: 1.5 });
    expect(scaled?.x).toBeCloseTo(9, 5);
    expect(scaled?.y).toBeCloseTo(-2, 5);

    expect(pointInFooterScene(90, 350, rect, camera, scale)).toBeNull();
    expect(pointInFooterScene(550, 510, rect, camera, scale)).toBeNull();
    expect(pointInFooterScene(550, 350, { ...rect, width: 0 }, camera, scale)).toBeNull();
  });

  it("tracks cursor velocity, wave phase, and hover strength across the footer", () => {
    const state = createFooterPointerState();
    stepFooterPointer(state, { x: 2.5, y: -0.8, active: true }, 0.05);
    expect(state.strength).toBeGreaterThan(0);
    expect(state.phase).toBeGreaterThan(0);
    expect(state.vx).toBeGreaterThan(0);
    expect(state.vy).toBeLessThan(0);

    const activeStrength = state.strength;
    stepFooterPointer(state, { x: 2.5, y: -0.8, active: false }, 0.05);
    expect(state.strength).toBeLessThan(activeStrength);
  });

  it("deforms the Three.js footer sheets and rim edges with a travelling wave as the cursor moves", () => {
    const sculpture = createFooterSculpture();
    try {
      const frontMesh = sculpture.root.getObjectByName("front") as THREE.Mesh;
      const frontRim = sculpture.root.getObjectByName("front-edge") as THREE.LineSegments;
      const posAttr = frontMesh.geometry.attributes.position as THREE.BufferAttribute;
      const rimAttr = frontRim.geometry.attributes.position as THREE.BufferAttribute;

      sculpture.update(1.0);
      const ambientPositions = new Float32Array(posAttr.array as Float32Array);
      const ambientRims = new Float32Array(rimAttr.array as Float32Array);

      sculpture.update(1.0, {
        x: 0.5,
        y: -0.6,
        vx: 4.0,
        vy: -1.5,
        strength: 1,
        phase: 1.8,
      });

      const hoveredPositions = new Float32Array(posAttr.array as Float32Array);
      const hoveredRims = new Float32Array(rimAttr.array as Float32Array);

      let maxSheetDeltaY = 0;
      let maxSheetDeltaZ = 0;
      for (let i = 0; i < hoveredPositions.length; i += 3) {
        maxSheetDeltaY = Math.max(maxSheetDeltaY, Math.abs(hoveredPositions[i + 1] - ambientPositions[i + 1]));
        maxSheetDeltaZ = Math.max(maxSheetDeltaZ, Math.abs(hoveredPositions[i + 2] - ambientPositions[i + 2]));
      }
      expect(maxSheetDeltaY).toBeGreaterThan(0.15);
      expect(maxSheetDeltaZ).toBeGreaterThan(0.2);

      let maxRimDeltaY = 0;
      for (let i = 0; i < hoveredRims.length; i += 3) {
        maxRimDeltaY = Math.max(maxRimDeltaY, Math.abs(hoveredRims[i + 1] - ambientRims[i + 1]));
      }
      expect(maxRimDeltaY).toBeGreaterThan(0.12);

      sculpture.update(1.0, {
        x: 2.2,
        y: -0.4,
        vx: 5.0,
        vy: 1.0,
        strength: 1,
        phase: 3.4,
      });
      const movedPositions = posAttr.array as Float32Array;
      let movedDelta = 0;
      for (let i = 0; i < movedPositions.length; i += 3) {
        movedDelta = Math.max(movedDelta, Math.abs(movedPositions[i + 1] - hoveredPositions[i + 1]));
      }
      expect(movedDelta).toBeGreaterThan(0.1);
    } finally {
      sculpture.dispose();
    }
  });

  it("spreads paint smudges and emits pigment particles as the cursor sweeps across the hero", () => {
    const html = renderToStaticMarkup(<Hero />);
    expect(html).toContain("hero-paint-canvas");

    const sim = createHeroPaintSimulation({ width: 1200, height: 520 });
    expect(sim.ribbons).toHaveLength(2);

    // Find a node on the primary coral-peach ribbon inside the hero viewport
    const targetNode = sim.ribbons[0].nodes.find(
      (n) => n.x > 150 && n.x < 1050 && n.y > 80 && n.y < 460
    )!;
    expect(targetNode).toBeDefined();
    const startNodeX = targetNode.x;
    const startNodeY = targetNode.y;
    const startSpread = targetNode.spread;

    // Hover and sweep across the ribbon asset
    sim.movePointer(targetNode.x - 20, targetNode.y - 10);
    sim.movePointer(targetNode.x + 60, targetNode.y + 35);
    sim.movePointer(targetNode.x + 120, targetNode.y + 70);

    expect(sim.smudges.length).toBeGreaterThan(0);
    expect(sim.particles.length).toBeGreaterThan(0);

    const firstSmudge = sim.smudges[0];
    const initialRadiusX = firstSmudge.radiusX;
    const initialRadiusY = firstSmudge.radiusY;

    sim.step(0.08);
    expect(firstSmudge.radiusX).toBeGreaterThan(initialRadiusX);
    expect(firstSmudge.radiusY).toBeGreaterThan(initialRadiusY);

    // Let all motion settle for several seconds; the spread ribbon asset must STAY spread
    for (let i = 0; i < 60; i++) {
      sim.step(0.1);
    }

    const permanentDisplacement = Math.hypot(
      targetNode.x - startNodeX,
      targetNode.y - startNodeY
    );
    expect(targetNode.spread).toBeGreaterThan(startSpread);
    expect(permanentDisplacement).toBeGreaterThan(8);
    expect(sim.smudges.some((s) => s.persistent)).toBe(true);
    expect(sim.particles).toHaveLength(0);

    // Verify the multi-fold silk field buffer reflects permanent spread deformation
    const freshSim = createHeroPaintSimulation({ width: 1200, height: 520 });
    const beforeBuf = new Uint8ClampedArray(60 * 30 * 4);
    const afterBuf = new Uint8ClampedArray(60 * 30 * 4);
    freshSim.renderFieldToBuffer(beforeBuf, 60, 30);

    freshSim.movePointer(600, 260);
    freshSim.movePointer(740, 210);
    for (let i = 0; i < 30; i++) {
      freshSim.step(0.1);
    }
    freshSim.renderFieldToBuffer(afterBuf, 60, 30);

    let diffPixels = 0;
    for (let i = 0; i < beforeBuf.length; i += 4) {
      if (
        Math.abs(beforeBuf[i] - afterBuf[i]) > 2 ||
        Math.abs(beforeBuf[i + 1] - afterBuf[i + 1]) > 2 ||
        Math.abs(beforeBuf[i + 2] - afterBuf[i + 2]) > 2
      ) {
        diffPixels++;
      }
    }
    expect(diffPixels).toBeGreaterThan(40);
  });
});

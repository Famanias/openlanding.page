import * as THREE from "three";
import { BUILD_PASSES, createOpticalLensModel, type LensBuildPass, type LensRuntime } from "./createOpticalLensModel";
import { createStudioEnvironment } from "./studioEnvironment";

/** Renderer owner. No browser globals are accessed until this function is called. */
export function createOpticalLensScene(canvas: HTMLCanvasElement, options: { pass?: LensBuildPass; quality?: "high" | "low" } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#202125");
  const stage = BUILD_PASSES.indexOf(options.pass ?? "optimization-pass");
  const environment = stage >= 3 ? createStudioEnvironment(renderer, stage >= 5) : null;
  const neutralEnvironment = stage >= 5 ? createStudioEnvironment(renderer) : environment;
  scene.environment = environment?.texture ?? null;
  const camera = new THREE.OrthographicCamera(-5, 5, 2.625, -2.625, 0.1, 50);
  const model = createOpticalLensModel(undefined, options);
  scene.add(model);
  scene.add(new THREE.HemisphereLight(0xe5eeff, 0x282631, 2));
  const key = new THREE.DirectionalLight(0xffffff, 3);
  key.position.set(-3, 5, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xdde4ff, 1.4);
  fill.position.set(3, 0, -4);
  scene.add(fill);
  const lime = new THREE.DirectionalLight("#D2F802", 1.8);
  lime.name = "lime-top-left-rim";
  lime.position.set(-4, 4, -0.4);
  const purple = new THREE.DirectionalLight("#A855F7", 1.5);
  purple.name = "purple-bottom-right-rim";
  purple.position.set(4, -3, -0.4);
  if (stage >= 5) scene.add(lime, purple);
  const render = () => renderer.render(scene, camera);
  function setLighting(mode: "neutral" | "grazing" | "reference") {
    if (mode === "grazing") key.position.set(-6, 1, .8);
    else key.position.set(-3, 5, 4);
    key.intensity = mode === "grazing" ? 5 : 3;
    fill.intensity = mode === "grazing" ? .3 : 1.4;
    lime.visible = purple.visible = mode === "reference";
    scene.environment = (mode === "reference" ? environment : neutralEnvironment)?.texture ?? null;
    render();
  }
  function setView(degrees: number) {
    const angle = THREE.MathUtils.degToRad(degrees);
    model.rotation.set(0, 0, 0);
    camera.position.set(Math.sin(angle) * 12, 0, Math.cos(angle) * 12);
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, 0);
    render();
  }
  function resize(width: number, height: number) {
    const aspect = width / Math.max(1, height);
    camera.left = -2.625 * aspect;
    camera.right = 2.625 * aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    render();
  }
  function setExplode(amount: number) {
    (model.userData.sculptRuntime as LensRuntime).setExplode(amount);
    render();
  }
  function setFocusRing(radians: number) {
    (model.userData.sculptRuntime as LensRuntime).setFocusRing(radians);
    render();
  }
  setView(0);
  return { renderer, scene, camera, model, render, setView, setLighting, setExplode, setFocusRing, resize, dispose() { (model.userData.sculptRuntime as LensRuntime).dispose(); environment?.dispose(); if(neutralEnvironment !== environment) neutralEnvironment?.dispose(); renderer.dispose(); } };
}

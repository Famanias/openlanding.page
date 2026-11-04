import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createDeck01Model } from '../models/createDeck01Model';

const views = [
    { eye: [3.8, 3.5, 5.4], look: [0, .4, 0] },
    { eye: [1.5, 5.3, -3.5], look: [0, .65, -.45] },
    { eye: [.3, 1.6, 6], look: [0, .35, .3] },
    { eye: [5.7, 2.1, -.6], look: [0, .4, 0] },
] as const;

export function createDeviceInspection(canvas: HTMLCanvasElement) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 40);
    const deck = createDeck01Model();
    scene.add(deck.group);
    // The inspection scene owns its textures; primary-scene context recovery can dispose independently.
    const textures = new Map<THREE.Texture, THREE.Texture>();
    const materials = new Set<THREE.Material>();
    const geometries = new Set<THREE.BufferGeometry>();
    scene.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        geometries.add(object.geometry);
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
            if (materials.has(material)) continue;
            materials.add(material);
            if (material instanceof THREE.MeshStandardMaterial) {
                for (const key of ['roughnessMap', 'bumpMap'] as const) {
                    const original = material[key];
                    if (!original) continue;
                    if (!textures.has(original)) textures.set(original, original.clone());
                    material[key] = textures.get(original)!;
                }
            }
        }
    });
    const generator = new THREE.PMREMGenerator(renderer), room = new RoomEnvironment();
    const environment = generator.fromScene(room, .04);
    scene.environment = environment.texture;
    scene.environmentIntensity = .65;
    room.dispose();
    generator.dispose();
    scene.add(new THREE.HemisphereLight(0xe3e9fa, 0x121419, 2));
    const key = new THREE.DirectionalLight(0xffffff, 4);
    key.position.set(-3, 6, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xaaa8ff, 2);
    rim.position.set(4, 3, -3);
    scene.add(rim);
    const guide = new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 2.15, -1.05), .9, 0xcdf266, .14, .08);
    guide.visible = false;
    scene.add(guide);
    const eye = new THREE.Vector3(...views[0].eye), look = new THREE.Vector3(...views[0].look);
    camera.position.copy(eye);
    let visible = false, disposed = false, frame = 0, last = 0;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    function render(now: number) {
        frame = 0;
        if (!visible || disposed) return;
        const dt = Math.min((now - last) / 1000, .05);
        last = now;
        camera.position.lerp(eye, reduced.matches ? 1 : 1 - Math.exp(-7 * dt));
        camera.lookAt(look);
        renderer.render(scene, camera);
        canvas.dataset.sceneReady = 'true';
        if (camera.position.distanceToSquared(eye) > .00001) frame = requestAnimationFrame(render);
    }
    function request() {
        if (!frame && visible && !disposed) { last = performance.now(); frame = requestAnimationFrame(render); }
    }
    const resize = new ResizeObserver(() => {
        const { width, height } = canvas.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.fov = width < 500 ? 43 : 34;
        camera.updateProjectionMatrix();
        request();
    });
    resize.observe(canvas);
    return {
        setVisible(value: boolean) {
            visible = value;
            canvas.dataset.rendering = String(value);
            if (value) request();
            else { cancelAnimationFrame(frame); frame = 0; }
        },
        inspect(index: number, wireframe: boolean) {
            eye.fromArray(views[index].eye);
            look.fromArray(views[index].look);
            guide.visible = index === 1;
            for (const material of materials) {
                if (material instanceof THREE.MeshStandardMaterial) material.wireframe = wireframe;
            }
            canvas.dataset.angle = String(index);
            canvas.dataset.wireframe = String(wireframe);
            request();
        },
        dispose() {
            disposed = true;
            cancelAnimationFrame(frame);
            resize.disconnect();
            geometries.forEach(geometry => geometry.dispose());
            materials.forEach(material => material.dispose());
            textures.forEach(texture => texture.dispose());
            guide.dispose();
            environment.dispose();
            renderer.dispose();
        },
    };
}

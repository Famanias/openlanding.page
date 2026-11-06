import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { createBootDisplay } from './bootDisplay';
import { describeModel } from './modelDiagnostics';
import { createDeck01Model } from '../models/createDeck01Model';
import { disposePolymerMaps } from '../models/geometry';
import { createCartridgeModel, resetSharedCartridgeResources } from '../models/createCartridgeModel';
import { games } from '../data/games';
import { useArchiveStore } from '../hooks/useArchiveStore';
import { computeCartridgeX, computeOpenness, modulo, smoothstep01 } from './animationMath';
import { createLabelTexture, createSpineTexture } from './textureFactory';
import { interpolatePose, worldPose, slotClippingPlane, seatingProgress, type Pose } from './insertionPath';
import { projectScreen, projectBounds, type ScreenProjection } from './projection';
export interface SceneController {
    step: (delta: number) => void;
    boot: () => void;
    back: () => void;
    skip: () => void;
    select: (index: number) => void;
    selectAndBoot: (index: number) => void;
    openWorld: (index: number) => void;
    dispose: () => void;
}
export function createArchiveScene(canvas: HTMLCanvasElement, onProjection: (rect: ScreenProjection, progress: number) => void, onError: () => void): SceneController {
    useArchiveStore.setState({ activeIndex: 0, phase: 'archive', direction: 1 });
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.localClippingEnabled = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x121419, 9, 16);
    const camera = new THREE.PerspectiveCamera(38, 1, .05, 100);
    camera.position.set(0, .85, 3.2);
    camera.lookAt(0, .60, 0);
    const environmentGenerator = new THREE.PMREMGenerator(renderer), room = new RoomEnvironment();
    const environment = environmentGenerator.fromScene(room, .04);
    scene.environment = environment.texture;
    scene.environmentIntensity = .5;
    room.dispose();
    environmentGenerator.dispose();
    scene.add(new THREE.HemisphereLight(0xd8e1fa, 0x171920, 1.15));
    const key = new THREE.DirectionalLight(0xffffff, 2.7);
    key.position.set(-3, 5, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { left: -7, right: 7, top: 5, bottom: -4, near: .1, far: 20 });
    key.shadow.bias = -.0003;
    key.shadow.normalBias = .012;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xaaa8ff, 1.5);
    rim.position.set(4, 3, -2);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0xcdf266, .5);
    fill.position.set(0, 1, 4);
    scene.add(fill);
    const deck = createDeck01Model();
    const display = createBootDisplay(deck.anchors.screenPlane.material);
    scene.add(deck.group);
    deck.group.position.set(0, -3, 0);
    deck.group.visible = false;
    const artMaterials = games.map(() => ({ labelMaterial: new THREE.MeshBasicMaterial({ color: 0x252934, toneMapped: false }), spineMaterial: new THREE.MeshStandardMaterial({ color: 0x252934, roughness: .64 }) }));
    const carts = Array.from({ length: 30 }, (_, i) => { const c = createCartridgeModel(artMaterials[i % 10]); c.group.userData.virtualIndex = i; scene.add(c.group); return c; });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 20), new THREE.ShadowMaterial({ opacity: .22 }));
    floor.name = 'archive-contact-shadow';
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = .10;
    floor.receiveShadow = true;
    scene.add(floor);
    for (const cartridge of carts) {
        const shell = cartridge.group.getObjectByName('shell');
        if (shell instanceof THREE.Mesh)
            shell.castShadow = true;
    }
    const labels = new Map<number, ReturnType<typeof createLabelTexture>>();
    const spines = games.map(createSpineTexture);
    carts.forEach((cartridge, index) => cartridge.setSpine(spines[index % 10]));
    let destroyed = false;
    const load = (i: number) => {
        i = modulo(i);
        if (labels.has(i) || destroyed || new URLSearchParams(location.search).has('clay'))
            return Promise.resolve();
        const l = createLabelTexture(games[i], renderer);
        labels.set(i, l);
        for (let j = i; j < 30; j += 10)
            carts[j].setLabel(l.texture, spines[i]);
        return l.ready.catch(onError);
    };
    void Promise.all([load(0), load(1), load(9)]).then(async () => {
        for (const i of [2, 8, 3, 7, 4, 6, 5]) {
            if (destroyed)
                break;
            await load(i);
        }
    });
    let s = 0, target = 0, frame = 0, last = performance.now(), hover = -1, dragging = false, startX = 0, lastX = 0, moved = false, activeCart = carts[0], timeline: gsap.core.Timeline | null = null;
    const pointer = new THREE.Vector2();
    const ray = new THREE.Raycaster();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const store = useArchiveStore;
    const phase = () => store.getState().phase;
    let announced = 0, expansion = 0, introRetreat = 0, pendingBoot = false, sceneVisible = true;
    const visibility = new IntersectionObserver(([entry]) => { sceneVisible = entry.isIntersecting; });
    visibility.observe(canvas);
    const announce = () => {
        const index = Math.round(target);
        if (index !== announced) {
            store.getState().select(index, Math.sign(index - announced));
            announced = index;
        }
        void load(index);
    };
    function step(d: number) {
        if (phase() !== 'archive')
            return;
        pendingBoot = false;
        target += d;
        announce();
    }
    function select(index: number) {
        if (phase() !== 'archive')
            return;
        pendingBoot = false;
        target += modulo(index - modulo(Math.round(target)) + 5) - 5;
        announce();
    }
    function selectAndBoot(index: number) {
        if (phase() !== 'archive') return;
        select(index);
        pendingBoot = true;
    }
    function resize() {
        const r = canvas.getBoundingClientRect();
        renderer.setSize(r.width, r.height, false);
        camera.aspect = r.width / r.height;
        camera.fov = r.width < 600 ? 45 : 38;
        camera.updateProjectionMatrix();
        if (phase() === 'screen-expanding' || phase() === 'returning' || phase() === 'game-detail')
            updateProjection(expansion);
        if (process.env.NODE_ENV === 'development' && new URLSearchParams(location.search).has('inspect')) {
            const p = new URLSearchParams(location.search);
            camera.setViewOffset(r.width, r.height, Number(p.get('ox') ?? 0) * r.width, Number(p.get('oy') ?? 0) * r.height, r.width, r.height);
        }
    }
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    function rail() {
        for (let i = 0; i < 30; i++) {
            const r = modulo(i - s + 15, 30) - 15, o = computeOpenness(r);
            const g = carts[i].group;
            g.visible = Math.abs(r) < 13;
            g.position.set(computeCartridgeX(r), .12 + o * .13 + (hover === i ? .045 : 0), o * .32);
            g.rotation.set(o * pointer.y * .035, (1 - o) * Math.PI / 2 + o * pointer.x * .06, -o * .061);
        }
    }
    function disableClip() { activeCart.setClipping(null); }
    function updateProjection(p: number) { expansion = p; onProjection(projectScreen(deck.anchors.screenPlane, camera, canvas), p); }
    function finish(pushHistory = true) {
        timeline?.kill();
        disableClip();
        deck.group.visible = true;
        deck.group.position.set(0, -.42, 0);
        camera.position.set(.5, 3.7, 7.1);
        camera.lookAt(0, .7, 0);
        deck.group.updateMatrixWorld(true);
        activeCart.group.visible = true;
        const p = worldPose(deck.anchors.slotFullyInserted);
        activeCart.group.position.copy(p.position);
        activeCart.group.quaternion.copy(p.quaternion);
        activeCart.setClipping(slotClippingPlane(deck.anchors.slotEntrance));
        deck.setBootState(1);
        display.select(games[store.getState().activeIndex]);
        display.setStage('WORLD FOUND');
        store.getState().setPhase('game-detail');
        updateProjection(1);
        const u = new URL(location.href);
        u.searchParams.set('game', games[store.getState().activeIndex].id);
        if (pushHistory && location.search !== u.search)
            history.pushState({}, '', u);
    }
    function boot() {
        if (phase() !== 'archive')
            return;
        pendingBoot = false;
        delete canvas.dataset.cursor;
        dragging = false;
        hover = -1;
        pointer.set(0, 0);
        s = target = Math.round(target);
        rail();
        activeCart = carts[modulo(Math.round(s), 30)];
        void load(modulo(Math.round(s)));
        const image = new Image();
        image.src = games[store.getState().activeIndex].worldUrl;
        const start: Pose = { position: activeCart.group.position.clone(), quaternion: activeCart.group.quaternion.clone() };
        const lifted: Pose = { position: new THREE.Vector3(0, 1.15, 1), quaternion: new THREE.Quaternion() };
        deck.group.visible = true;
        deck.group.position.set(0, -3, 0);
        deck.setBootState(0);
        display.select(games[store.getState().activeIndex]);
        display.setStage('OFF');
        const motion = { p: 0, expand: 0 };
        introRetreat = 0;
        timeline = gsap.timeline({ onComplete: () => finish() });
        store.getState().setPhase('extracting');
        timeline.to(motion, { p: 1, duration: .5, onUpdate: () => { introRetreat = motion.p; interpolatePose(activeCart.group, start, lifted, smoothstep01(motion.p)); } });
        timeline.to(camera.position, { x: .5, y: 3.7, z: 7.1, duration: .5, ease: 'power2.out', onUpdate: () => camera.lookAt(0, .7, 0) }, 0);
        timeline.call(() => store.getState().setPhase('console-entering'));
        timeline.to(deck.group.position, { y: -.42, duration: .75, ease: 'power3.out' });
        timeline.to(camera.position, { x: .5, y: 3.7, z: 7.1, duration: .75, onUpdate: () => camera.lookAt(0, .7, 0) }, '<');
        timeline.call(() => { store.getState().setPhase('aligning'); motion.p = 0; });
        timeline.to(motion, { p: 1, duration: .4, onUpdate: () => interpolatePose(activeCart.group, lifted, worldPose(deck.anchors.slotAlignment), smoothstep01(motion.p)) });
        timeline.call(() => { store.getState().setPhase('inserting'); motion.p = 0; activeCart.setClipping(slotClippingPlane(deck.anchors.slotEntrance)); });
        timeline.to(motion, { p: 1, duration: .6, ease: 'none', onUpdate: () => interpolatePose(activeCart.group, worldPose(deck.anchors.slotAlignment), worldPose(deck.anchors.slotFullyInserted), seatingProgress(motion.p)) });
        timeline.call(() => { store.getState().setPhase('booting'); deck.setBootState(1); display.setStage('READING ROM'); });
        timeline.to({ v: 0 }, { v: 1, duration: .35 });
        timeline.call(() => display.setStage('WORLD FOUND'));
        timeline.to({ v: 0 }, { v: 1, duration: .30 });
        timeline.call(() => store.getState().setPhase('screen-expanding'));
        timeline.to(motion, { expand: 1, duration: .85, ease: 'power3.inOut', onUpdate: () => updateProjection(motion.expand) });
        if (reduced.matches)
            finish();
    }
    function back(pushHistory = true) {
        pendingBoot = false;
        if (phase() === 'archive' || phase() === 'returning')
            return;
        const early = phase() !== 'game-detail' && phase() !== 'screen-expanding';
        timeline?.kill();
        if (early) {
            const from = { position: activeCart.group.position.clone(), quaternion: activeCart.group.quaternion.clone() }, to = { position: new THREE.Vector3(0, .25, .32), quaternion: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -.061)) }, motion = { p: 0 };
            disableClip();
            updateProjection(0);
            store.getState().setPhase('returning');
            display.setStage('OFF');
            timeline = gsap.timeline({ onComplete: () => { deck.group.visible = false; store.getState().setPhase('archive'); rail(); } });
            timeline.to(motion, { p: 1, duration: reduced.matches ? .01 : .55, onUpdate: () => interpolatePose(activeCart.group, from, to, smoothstep01(motion.p)) });
            timeline.to(deck.group.position, { y: -3, duration: .4 }, '<');
            timeline.to(camera.position, { x: 0, y: .85, z: 3.2, duration: .5, onUpdate: () => camera.lookAt(0, .60, 0) }, '<');
            if (pushHistory) {
                const url = new URL(location.href);
                url.searchParams.delete('game');
                history.pushState({}, '', url);
            }
            return;
        }
        store.getState().setPhase('returning');
        const motion = { p: 1, t: 0 };
        timeline = gsap.timeline({ onComplete: () => { disableClip(); deck.group.visible = false; store.getState().setPhase('archive'); rail(); onProjection(projectScreen(deck.anchors.screenPlane, camera, canvas), 0); } });
        timeline.to(motion, { p: 0, duration: reduced.matches ? .01 : .55, onUpdate: () => updateProjection(motion.p) });
        timeline.call(() => { deck.setBootState(0); display.setStage('OFF'); });
        const dock = worldPose(deck.anchors.slotFullyInserted), above = worldPose(deck.anchors.slotAlignment);
        timeline.to(motion, { t: 1, duration: reduced.matches ? .01 : .55, onUpdate: () => interpolatePose(activeCart.group, dock, above, smoothstep01(motion.t)) });
        timeline.call(() => { disableClip(); motion.t = 0; });
        const shelf: Pose = { position: new THREE.Vector3(0, .25, .32), quaternion: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -.061)) };
        timeline.to(motion, { t: 1, duration: reduced.matches ? .01 : .7, onUpdate: () => interpolatePose(activeCart.group, above, shelf, smoothstep01(motion.t)) });
        timeline.to(deck.group.position, { y: -3, duration: .6 }, '<');
        timeline.to(camera.position, { x: 0, y: .85, z: 3.2, duration: .6, onUpdate: () => camera.lookAt(0, .60, 0) }, '<');
        const u = new URL(location.href);
        u.searchParams.delete('game');
        if (pushHistory)
            history.pushState({}, '', u);
    }
    function hit(e: PointerEvent) {
        const r = canvas.getBoundingClientRect();
        pointer.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1);
        ray.setFromCamera(pointer, camera);
        const hits = ray.intersectObjects(carts.filter(c => c.group.visible).map(c => c.group), true);
        let obj: THREE.Object3D | null = hits[0]?.object ?? null;
        while (obj && obj.userData.virtualIndex === undefined)
            obj = obj.parent;
        return obj?.userData.virtualIndex ?? -1;
    }
    function down(e: PointerEvent) {
        if (phase() !== 'archive')
            return;
        pendingBoot = false;
        startX = lastX = e.clientX;
        moved = false;
        dragging = true;
        canvas.setPointerCapture(e.pointerId);
    }
    function move(e: PointerEvent) {
        if (phase() !== 'archive')
            return;
        hover = hit(e);
        canvas.dataset.cursor = hover < 0 ? 'default' : Math.abs(modulo(hover - s + 15, 30) - 15) < .2 ? 'boot' : 'spine';
        canvas.style.cursor = dragging ? 'grabbing' : hover >= 0 ? 'pointer' : 'grab';
        if (dragging) {
            if (Math.abs(e.clientX - startX) > 6)
                moved = true;
            if (moved) {
                target -= (e.clientX - lastX) / 110;
                announce();
            }
            lastX = e.clientX;
        }
    }
    function up(e: PointerEvent) {
        if (!dragging)
            return;
        dragging = false;
        if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
        if (moved) {
            target = Math.round(target);
            announce();
            return;
        }
        const i = hit(e);
        if (i < 0)
            return;
        const r = modulo(i - s + 15, 30) - 15;
        if (Math.abs(r) < .2)
            boot();
        else {
            target = Math.round(s + r);
            announce();
        }
    }
    function cancel(e: PointerEvent) { dragging = false; target = Math.round(target); if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId); }
    function leave() { hover = -1; delete canvas.dataset.cursor; }
    function wheel(e: WheelEvent) {
        if (phase() === 'archive' && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            pendingBoot = false;
            e.preventDefault();
            target += e.deltaX * .008;
            announce();
        }
    }
    function keydown(e: KeyboardEvent) {
        if ((e.target as HTMLElement).matches('input,textarea,select'))
            return;
        if (e.key === 'Escape') {
            back();
            return;
        }
        if (phase() === 'archive' && canvas.getBoundingClientRect().bottom > 0 && canvas.getBoundingClientRect().top < innerHeight && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
            e.preventDefault();
            step(e.key === 'ArrowRight' ? 1 : -1);
        }
    }
    function historyChange() {
        const id = new URLSearchParams(location.search).get('game');
        const i = games.findIndex(g => g.id === id);
        if (i < 0) {
            back(false);
            return;
        }
        disableClip();
        activeCart.group.visible = false;
        store.getState().select(i);
        target = s = i;
        announced = i;
        activeCart = carts[i];
        finish(false);
    }
    function lost(e: Event) { e.preventDefault(); timeline?.kill(); cancelAnimationFrame(frame); onError(); }
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', cancel);
    canvas.addEventListener('pointerleave', leave);
    canvas.addEventListener('wheel', wheel, { passive: false });
    canvas.addEventListener('webglcontextlost', lost);
    window.addEventListener('keydown', keydown);
    window.addEventListener('popstate', historyChange);
    const inspect = process.env.NODE_ENV === 'development' ? new URLSearchParams(location.search).get('inspect') : null;
    if (inspect) {
        scene.background = new THREE.Color(0xffffff);
        for (const c of carts)
            c.group.visible = false;
        deck.group.visible = inspect === 'deck';
        deck.group.position.set(0, 0, 0);
        const params = new URLSearchParams(location.search);
        const angle = Number(params.get('angle') ?? 35) * Math.PI / 180;
        if (inspect === 'cartridge') {
            carts[0].group.visible = true;
            carts[0].group.position.set(0, 0, 0);
            carts[0].group.rotation.set(0, 0, 0);
        }
        const distance = Number(params.get('distance') ?? (inspect === 'deck' ? 4 : 2));
        camera.position.set(Math.sin(angle) * distance, Number(params.get('height') ?? (inspect === 'deck' ? 3.2 : .85)), Math.cos(angle) * distance);
        camera.lookAt(0, Number(params.get('look') ?? (inspect === 'deck' ? .4 : .48)), 0);
    }
    function tick(now: number) {
        if (destroyed)
            return;
        floor.visible = !inspect && phase() === 'archive';
        const dt = Math.min((now - last) / 1000, .05);
        last = now;
        if (!sceneVisible && phase() === 'archive' && !inspect) { frame = requestAnimationFrame(tick); return; }
        if (!inspect) {
            if (phase() === 'archive') {
                s = reduced.matches ? target : s + (target - s) * (1 - Math.exp(-(dragging ? 18 : 5.2) * dt));
                rail();
                if (pendingBoot && Math.abs(s - target) < .015) boot();
            }
            else {
                for (let index = 0; index < carts.length; index++) {
                    const cartridge = carts[index];
                    if (cartridge === activeCart)
                        continue;
                    const transitional = phase() === 'extracting' || phase() === 'returning';
                    const relative = modulo(index - s + 15, 30) - 15;
                    cartridge.group.visible = transitional && Math.abs(relative) < 13;
                    if (transitional) {
                        const retreat = phase() === 'extracting' ? introRetreat : THREE.MathUtils.clamp((camera.position.z - 3.2) / 3.9, 0, 1);
                        cartridge.group.position.set(computeCartridgeX(relative), .12 - retreat * .15, -retreat * 3);
                        cartridge.group.rotation.set(0, Math.PI / 2, 0);
                    }
                }
            }
        }
        renderer.render(scene, camera);
        canvas.dataset.sceneReady = 'true';
        frame = requestAnimationFrame(tick);
    }
    if (inspect) {
        rim.color.set(0xffffff);
        fill.color.set(0xffffff);
        if (new URLSearchParams(location.search).has('clay'))
            scene.traverse(o => {
                if (o instanceof THREE.Mesh)
                    o.material = new THREE.MeshBasicMaterial({ color: 0x555555 });
            });
        resize();
    }
    if (process.env.NODE_ENV === 'development')
        Object.assign(canvas, { savepointDiagnostics: (models = true) => ({ phase: phase(), shelfCurrent: s, shelfTarget: target, expansion, cartridgeCount: carts.length, activeBounds: projectBounds(activeCart.group, camera, canvas), deckBounds: projectBounds(deck.group, camera, canvas), activeIndex: store.getState().activeIndex, screen: projectScreen(deck.anchors.screenPlane, camera, canvas), deck: models ? describeModel(deck.group) : null, cartridge: models ? describeModel(activeCart.group) : null, slot: worldPose(deck.anchors.slotEntrance).position.toArray(), dock: worldPose(deck.anchors.slotFullyInserted).position.toArray(), tip: worldPose(activeCart.anchors.connectorTongue).position.toArray(), slotRay: (() => { const origin = worldPose(deck.anchors.slotEntrance).position; origin.y += 2; const hit = new THREE.Raycaster(origin, new THREE.Vector3(0, -1, 0)).intersectObject(deck.group, true)[0]; return hit ? { name: hit.object.name, point: hit.point.toArray() } : null; })(), drawCalls: renderer.info.render.calls, triangles: renderer.info.render.triangles }) });
    if (!inspect)
        rail();
    frame = requestAnimationFrame(tick);
    if (new URLSearchParams(location.search).has('game'))
        historyChange();
    return { step, select, selectAndBoot, boot, back, skip: () => finish(), openWorld(index) { disableClip(); activeCart.group.visible = false; target = s = index; announced = index; store.getState().select(index); activeCart = carts[index]; finish(); }, dispose() {
            destroyed = true;
            timeline?.kill();
            cancelAnimationFrame(frame);
            observer.disconnect();
            visibility.disconnect();
            canvas.removeEventListener('pointerdown', down);
            canvas.removeEventListener('pointermove', move);
            canvas.removeEventListener('pointerup', up);
            canvas.removeEventListener('pointercancel', cancel);
            canvas.removeEventListener('pointerleave', leave);
            canvas.removeEventListener('wheel', wheel);
            canvas.removeEventListener('webglcontextlost', lost);
            window.removeEventListener('keydown', keydown);
            window.removeEventListener('popstate', historyChange);
            const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
            scene.traverse(o => {
                if (o instanceof THREE.Mesh) {
                    geometries.add(o.geometry);
                    for (const m of Array.isArray(o.material) ? o.material : [o.material])
                        materials.add(m);
                }
            });
            geometries.forEach(g => g.dispose());
            materials.forEach(m => m.dispose());
            labels.forEach(l => l.dispose());
            spines.forEach(t => t.dispose());
            disableClip();
            display.dispose();
            environment.dispose();
            disposePolymerMaps();
            resetSharedCartridgeResources();
            delete (canvas as HTMLCanvasElement & {
                savepointDiagnostics?: unknown;
            }).savepointDiagnostics;
            renderer.dispose();
        } };
}

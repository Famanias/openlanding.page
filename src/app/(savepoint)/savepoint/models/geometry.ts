import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
export function box(width: number, height: number, depth: number, radius = .015) { return new RoundedBoxGeometry(width, height, depth, 2, Math.min(radius, width / 3, height / 3, depth / 3)); }
export function part<M extends THREE.Material>(parent: THREE.Object3D, name: string, geometry: THREE.BufferGeometry, material: M, position: [
    number,
    number,
    number
]) { const mesh = new THREE.Mesh(geometry, material); mesh.name = name; mesh.position.set(...position); mesh.userData.partId = name; parent.add(mesh); return mesh; }
let polymerMaps: {
    roughness: THREE.DataTexture;
    height: THREE.DataTexture;
} | null = null;
function getPolymerMaps() {
    if (polymerMaps)
        return polymerMaps;
    const size = 1024, roughness = new Uint8Array(size * size * 4), height = new Uint8Array(size * size * 4);
    let seed = 19341;
    const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) | 0; return (seed >>> 0) / 4294967296; };
    for (let y = 0; y < size; y++)
        for (let x = 0; x < size; x++) {
            const index = (y * size + x) * 4;
            const broad = Math.sin(x * .019) * Math.cos(y * .023);
            const rough = Math.round(224 + broad * 8 + (random() - .5) * 20);
            const grain = Math.round(128 + Math.sin(x * .35) * Math.sin(y * .29) * 5 + (random() - .5) * 24);
            for (let channel = 0; channel < 3; channel++) {
                roughness[index + channel] = rough;
                height[index + channel] = grain;
            }
            roughness[index + 3] = height[index + 3] = 255;
        }
    const make = (data: Uint8Array) => { const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat); texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.repeat.set(3, 3); texture.needsUpdate = true; return texture; };
    return polymerMaps = { roughness: make(roughness), height: make(height) };
}
export const polymer = () => { const maps = getPolymerMaps(); return new THREE.MeshPhysicalMaterial({ color: 0x24262c, roughness: .66, roughnessMap: maps.roughness, bumpMap: maps.height, bumpScale: .0008, metalness: 0, clearcoat: .08, clearcoatRoughness: .48 }); };
export function disposePolymerMaps() { polymerMaps?.roughness.dispose(); polymerMaps?.height.dispose(); polymerMaps = null; }
export function enableAssembly(group: THREE.Group, parts: Record<string, THREE.Object3D>) {
    group.updateMatrixWorld(true);
    const center = new THREE.Box3().setFromObject(group).getCenter(new THREE.Vector3());
    const records = Object.values(parts).filter(object => !object.userData.explodeWithParent).map((object, index) => {
        const partCenter = new THREE.Box3().setFromObject(object).getCenter(new THREE.Vector3());
        const direction = partCenter.sub(center);
        if (direction.lengthSq() < .001)
            direction.set(0, index % 2 ? 1 : -1, 0);
        const clearance = direction.clone().normalize().multiplyScalar(.12);
        return { object, origin: object.position.clone(), offset: direction.add(clearance).add(new THREE.Vector3(0, (index % 2 ? 1 : -1) * index * .015, 0)) };
    });
    const lookup = new Map(Object.entries(parts).map(([name, object]) => [object, name]));
    const runtime = { nodes: parts, destructionGroups: Object.keys(parts), setExploded(amount: number) {
            const value = THREE.MathUtils.clamp(amount, 0, 1);
            for (const record of records)
                record.object.position.copy(record.origin).addScaledVector(record.offset, value);
            group.updateMatrixWorld(true);
        }, pickPart(hit: THREE.Object3D) {
            let object: THREE.Object3D | null = hit;
            while (object && object !== group) {
                const name = lookup.get(object);
                if (name && !object.userData.explodeWithParent)
                    return name;
                object = object.parent;
            }
            return null;
        } };
    group.userData.sculptRuntime = runtime;
    return runtime;
}
